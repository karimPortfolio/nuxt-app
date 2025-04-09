import { PrismaClient } from '@prisma/client';

var _a;
const prismaClientSingleton = () => {
  return new PrismaClient();
};
const prisma = (_a = globalThis.prismaGlobal) != null ? _a : prismaClientSingleton();

export { prisma as p };
//# sourceMappingURL=prisma.mjs.map
