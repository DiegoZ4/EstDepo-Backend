// En upload.controller.ts (puedes agregarlo junto al de equipos)
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  // Endpoint para equipos (ya existente)
  @Post('equipo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/equipos',
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const extension = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadEquipo(@UploadedFile() file: Express.Multer.File) {
    const baseUrl = process.env.API_URL || 'http://stats.zetaserver.com.ar';
    return { url: `${baseUrl}/img/equipos/${file.filename}` };
  }

  // Nuevo endpoint para jugadores
  @Post('jugador')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/jugadores',
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const extension = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadJugador(@UploadedFile() file: Express.Multer.File) {
    const baseUrl = process.env.API_URL || 'http://stats.zetaserver.com.ar';
    return { url: `${baseUrl}/img/jugadores/${file.filename}` };
  }
}
