import { DataSource } from "typeorm"

const AppDataSource = new DataSource(
    {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "1234",
        "database": "naturenook_db",
        "entities": ["src/entity/**"],
        "synchronize": true,
        "logging": true
    }
)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource