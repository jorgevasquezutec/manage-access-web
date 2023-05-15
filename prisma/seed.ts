import { db } from "@/lib/db";
import bcrypt from "bcrypt";

async function main() {

    await db.user.upsert({
        where: { email: "admin@email.com" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@email.com",
            password: await bcrypt.hash("aveces", 12),
        }
    })
}
main()
    .then(async () => {
        await db.$disconnect()
        console.log("Seed complete")
    }).catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })