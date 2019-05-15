import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { memoryStorage } from 'multer';
import * as path from 'path';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.json' && ext !== '.csv') {
            return callback(new Error('Only .json files allowed'), true);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024,
        parts: 1,
      },
        }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
