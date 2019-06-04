import { MapaModule } from './mapa.module';

describe('MapaModule', () => {
  let mapaModule: MapaModule;

  beforeEach(() => {
    mapaModule = new MapaModule();
  });

  it('should create an instance', () => {
    expect(mapaModule).toBeTruthy();
  });
});
