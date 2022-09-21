import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http'
import * as socket from '../sockets/socket'
export default class Server {

  private static _instance: Server;

  //Servidor
  public app: express.Application;
  public port: number;
  
  //Propiedad encargada de emitir eventos
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT

    this.httpServer = new http.Server(this.app);
    // this.io = socketIO(this.httpServer);
    
    this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
    this.escucharSockets();

  }

  public static get instance(){
    return this._instance || (this._instance = new this())
  }

  private escucharSockets() {
    
    console.log('Escuchando conexiones - sockets');

    this.io.on('connection', cliente => {

      //Conectar cliente
      socket.conectarCliente(cliente, this.io);

      //Escucha configuracion de usuario
      socket.configurarUsuario(cliente, this.io)

      //Obtener usuarios activos
      socket.obtenerUsuarios(cliente, this.io)

      //Mensajes
      socket.mensaje(cliente, this.io)

      //Desconectar cliente
      socket.desconectar(cliente, this.io);
    })

  }

  start( callback: Function ) {

    this.httpServer.listen(this.port, callback())

  }

}