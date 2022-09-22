export class GraficaData {

  private opcion: string[] = [ 'Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4']

  private valores: number[] = [0,0,0,0]

  constructor() {  }

  getDataGrafica() {

    return {
      datasets: [
        {
          data: this.valores,
          label: 'Ventas'
        }
      ],
      labels: this.opcion
    }

  }

  incrementarValor(opcion: number, valor: number) {

    for (const i in this.opcion) {
      if (this.opcion.indexOf(this.opcion[i]) === opcion) {
        this.valores[i] += valor;
      }
    }

    return this.getDataGrafica();

  }

}