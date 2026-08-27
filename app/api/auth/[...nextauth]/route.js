import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'bestaitoolsfree_super_secret_auth_key_2026',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) return true;
      try {
        const { getCollection } = await import('@/lib/db');
        const usersCollection = await getCollection('users');
        const email = user.email.toLowerCase();
        
        const envAdmins = (process.env.ADMIN_EMAILS || 'parwal111@gmail.com,admin@bestaitoolsfree.com')
          .split(',')
          .map(e => e.trim().toLowerCase())
          .filter(Boolean);
        
        const isEnvAdmin = envAdmins.includes(email);
        
        const existing = await usersCollection.findOne({
          $or: [{ email }, { userId: user.id }]
        });
        
        const now = new Date();
        if (existing) {
          const updateFields = {
            name: user.name || existing.name || '',
            imageUrl: user.image || existing.imageUrl || existing.image || '',
            updatedAt: now,
          };
          if (isEnvAdmin) {
            updateFields.role = 'admin';
            updateFields.isAdmin = true;
          }
          await usersCollection.updateOne(
            { _id: existing._id },
            { $set: updateFields }
          );
        } else {
          const { v4: uuidv4 } = await import('uuid');
          await usersCollection.insertOne({
            _id: uuidv4(),
            userId: user.id || email,
            email,
            name: user.name || '',
            imageUrl: user.image || '',
            country: '',
            linkedinProfile: '',
            role: isEnvAdmin ? 'admin' : 'user',
            isAdmin: isEnvAdmin,
            createdAt: now,
            updatedAt: now,
          });
        }
      } catch (err) {
        console.error('Error synchronizing user on signIn:', err.message);
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      const email = (token.email || user?.email || '').toLowerCase();
      const envAdmins = (process.env.ADMIN_EMAILS || 'parwal111@gmail.com,admin@bestaitoolsfree.com')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean);
      
      const isEnvAdmin = Boolean(email && envAdmins.includes(email));

      try {
        const { getCollection } = await import('@/lib/db');
        const usersCollection = await getCollection('users');
        const dbUser = await usersCollection.findOne({
          $or: [{ email }, { userId: token.id || token.sub }]
        });

        if (dbUser) {
          token.id = String(dbUser._id || token.id);
          token.name = dbUser.name || token.name || '';
          token.country = dbUser.country || '';
          token.linkedinProfile = dbUser.linkedinProfile || '';
          token.isProfileComplete = Boolean(dbUser.name?.trim() && dbUser.country?.trim());
          token.role = isEnvAdmin ? 'admin' : (dbUser.role || 'user');
          token.isAdmin = isEnvAdmin || Boolean(dbUser.isAdmin || dbUser.role === 'admin');
        } else {
          token.country = '';
          token.linkedinProfile = '';
          token.isProfileComplete = false;
          token.role = isEnvAdmin ? 'admin' : 'user';
          token.isAdmin = isEnvAdmin;
        }
      } catch (e) {
        token.role = isEnvAdmin ? 'admin' : 'user';
        token.isAdmin = isEnvAdmin;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id || token.sub;
        session.user.name = token.name || session.user.name;
        session.user.country = token.country || '';
        session.user.linkedinProfile = token.linkedinProfile || '';
        session.user.isProfileComplete = token.isProfileComplete || false;
        session.user.role = token.role || 'user';
        session.user.isAdmin = token.isAdmin || token.role === 'admin';
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

