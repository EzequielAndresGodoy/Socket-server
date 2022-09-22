import {Router, Request, Response} from 'express';
import { GraficaData } from '../classes/grafica';
import Server from '../classes/server';
import { mapa, usuariosConectados } from '../sockets/socket';

const router = Router();


//MAPA

router.get('/mapa', (req: Request, res: Response) => {

  res.json(
    mapa.getMarcadores()
  );

});


















//ESTO ES PARA LAS GRAFICAS Y ALGUNAS COSAS DEL CHAT
const grafica = new GraficaData();

router.get('/grafica', (req: Request, res: Response) => {

  res.json(
    grafica.getDataGrafica()
  );

});

router.post('/grafica', (req: Request, res: Response) => {

  const opcion = Number(req.body.opcion);
  const unidades = Number(req.body.unidades);

  grafica.incrementarValor(opcion, unidades);

  const server =  Server.instance;
  server.io.emit('cambio-grafica', grafica.getDataGrafica())

  res.json(grafica.getDataGrafica());

});

router.post('/mensajes/:id', (req: Request, res: Response) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;

  server.io.in(id).emit('mensaje-privado',payload);

  res.json({
    ok: true,
    cuerpo,
    de,
    id
  });

});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io .allSockets().then( (clientes) => {
          res.json({
              ok: true,
              clientes : Array.from(clientes)
      });    
  })
  .catch( err =>{
      res.json({
          ok: false,
          err,
      });
  })
});

//Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {

  

  res.json({
    ok: false,
    clientes: usuariosConectados.getLista(),
  });

})

export default router