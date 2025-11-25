import { PrismaClient } from '@/app/generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>

const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate())
}

const globalForPrisma = global as unknown as { 
    prisma: ExtendedPrismaClient | undefined
}

const prismaClientSingleton = () => {
  try {
    return createPrismaClient()
  } catch (error) {
    console.error('Failed to initialize Prisma Client:', error)
    throw error
  }
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma