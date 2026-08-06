import CredentialsProvider from "next-auth/providers/credentials";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password || !credentials?.otp) {
          throw new Error("Missing username, password or otp");
        }
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        try {
          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
              otp: credentials.otp
            })
          });
          const user = await res.json();
          if (!res.ok) {
            throw new Error(user.error || "Invalid username or password");
          }
          return user;
        } catch (error) {
          throw new Error(error.message || "Authentication failed");
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.clinicName = user.clinicName;
        token.qualifications = user.qualifications;
        token.isActive = user.isActive;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.clinicName = token.clinicName;
        session.user.qualifications = token.qualifications;
        session.user.isActive = token.isActive;
        session.user.permissions = token.permissions;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};
export {
  authOptions
};
