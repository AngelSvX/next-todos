import mysql2 from 'mysql2/promise'

export const todoDB = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "todonext",
  password: "Angelsvx211403"
})

export const testConnection = async () => {
  try {
    const response = todoDB.getConnection()
    console.log("Conexión establecida")
  } catch (error) {
    console.error("Sucedió un error con la conexión a la BD")
    console.log(error)
  }
}