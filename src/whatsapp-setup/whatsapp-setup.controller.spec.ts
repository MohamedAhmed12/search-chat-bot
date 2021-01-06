import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappSetupController } from './whatsapp-setup.controller';

describe('WhatsappSetupController', () => {
  let controller: WhatsappSetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappSetupController],
    }).compile();

    controller = module.get<WhatsappSetupController>(WhatsappSetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
