import {Module} from '@nestjs/common';
import {Parser} from './spec/parser';

@Module({
  providers: [Parser],
  exports: [Parser]
})
export class SilicateModule {
}
