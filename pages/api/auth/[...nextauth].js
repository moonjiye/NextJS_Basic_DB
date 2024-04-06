import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import axios from "axios";

async function refreshAccessToken(token) {
    //1. access token 재발급해달라고 POST요청
    const url = 'https://github.com/login/oauth/access_token'
    const params = {
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }

    const res = await axios.post(url, null, { params : params })
    const refreshedTokens = await res.data
    if (res.status !== 200) {
      console.log('실패', refreshedTokens)
    }

    //2. 재발급한거 출력해보기 
    console.log('토큰 재발급한거 : ')
    console.log(refreshedTokens)
    // access_token=ghu_8afeApnRAkzkBYDmshCKqq6uyKJunA1EScAS
    // &expires_in=28800
    // &refresh_token=ghr_IZNb9vbPyu8FnSpnP1fLP0DQPq1EVH2JLB6HMOjgBaeGbZSo3dHJihM46QM5cX1odrOUYe1OhZxc
    // &refresh_token_expires_in=15811200
    // &scope=
    // &token_type=bearer   

    //3. 이걸로 새로운 토큰 만들어서 return 해주기 
    let data = new URLSearchParams(refreshedTokens);
    if (data.get('error') == null){
      return {
        ...token,
        accessToken: data.get('access_token'),
        accessTokenExpires:
          Math.round(Date.now() / 1000) + Number(data.get('expires_in')),
        refreshToken: data.get('refresh_token')
      }
    } else {
      return token
    }
} 

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),

    // CredentialsProvider() 사용시 ID/PW으로 로그인 가능해짐. Session 방식 사용불가, JWT만 사용가능
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('my_mongo_db');
        let user = await db.collection('user_info').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    })
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 30 * 24 * 60 * 60 //30일
  // },
  jwt  : {
    maxAge : 60,
  },


  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    async jwt({ token, account, user }) {
      console.log('account', account);
      console.log('user', user);
      console.log('token', token);
      
      
      // 1. 첫 JWT 토큰 만들어주기 (첫 로그인시에만 실행)
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token, 
          accessTokenExpires: account.expires_at,
          user,
        }
      }
      // 2. 남은 시간이 임박한 경우 access token 재발급하기 
      // 지금은 개발중이라 8시간 - 10초 남았을 때 재발급중
      let 남은시간 = token.accessTokenExpires - Math.round(Date.now() / 1000)
      if (남은시간 < (60 * 60 * 8 - 10) ) {  
        console.log('유효기간 얼마안남음')
        let 새로운JWT = await refreshAccessToken(token) // 3. 깃헙에게 재발급해달라고 조르기 
        console.log('새로운 JWT : ', 새로운JWT)
        return 새로운JWT
      } else {
        return token
      }
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.accessTokenExpires = token.accessTokenExpires
      session.error = token.error
      return session
    },
  },
  secret : process.env.NEXTAUTH_SECRET,
  // adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions);