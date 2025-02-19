import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('img')
export class ImgController {
  // Endpoint existente para equipos
  @Get('equipos/:filename')
  async getEquipoImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', 'equipos', filename);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error enviando archivo:", err);
        res.status(404).json({ error: "Archivo no encontrado" });
      }
    });
  }

  // Nuevo endpoint para jugadores
  @Get('jugadores/:filename')
  async getJugadorImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', 'jugadores', filename);
    console.log("Buscando imagen de jugador en:", filePath);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error enviando archivo:", err);
        res.status(404).json({ error: "Archivo no encontrado" });
      }
    });
  }
}
