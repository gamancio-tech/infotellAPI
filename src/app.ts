import express from "express"
import cors from "cors"
import router from "./routes"


function createApp() {
  const app = express()

  app.use(express.json())
  app.use("/api", router)
  app.use(cors())

  return app
}

export default createApp;