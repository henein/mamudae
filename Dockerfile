FROM node:lts AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files needed for install
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy rest of the code and build
COPY . .
RUN pnpm nx build mamudae-server --configuration production

# Runtime stage
FROM node:lts AS runner
WORKDIR /app

# Copy build output
COPY --from=builder /app/dist/apps/mamudae-server/ ./

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000
CMD ["node", "main.js"]
