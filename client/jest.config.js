/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Vì mình đang test logic (SRS, xử lý chuỗi), dùng môi trường node là nhanh nhất
    moduleNameMapper: {
      // Nếu bạn dùng Alias như '@/components/...' trong dự án, hãy cấu hình ở đây
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };