export class Usuario {

  public id: string;
  public nombre: string;
  public sala: string;

  constructor(id: string, nombre?: string, sala?: string) {

    this.id = id;
    this.nombre = 'Sin nombre';
    this.sala = 'Sin sala'
  }

}