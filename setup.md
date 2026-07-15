> npm create hono@latest
>npm install prisma tsx @types/pg --save-dev
>npm install @prisma/client @prisma/adapter-pg dotenv pg
>npx prisma init --output ../src/generated/prisma

// now add your direct url in prisma.config.ts file and run the following command to generate the client

>npx prisma migrate dev --name fisrst-migration  // this will create the migration file and apply the migration to the database
>npx prisma migrate reset  // this will reset the database and apply the migrations agar migration na ho tab reset kar ke karenge 
>npx prisma generate // this will generate the client in the specified output directory ,,jitani baar bhi aap schema.prisma file me changes karoge utni baar ye command run karna padega taki client update ho jaye

# Authentication
>npm install hono/jwt   //isme ham normal jwt use nahi karte hai hono ka jwt chahiye
>

npm publish --access public
// const {success} = signUpInput.safeParse(req.body)