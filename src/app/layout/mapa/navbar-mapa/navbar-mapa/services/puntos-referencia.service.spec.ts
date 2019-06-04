import { TestBed, inject } from '@angular/core/testing';

import { PuntosReferenciaService } from './puntos-referencia.service';

describe('PuntosReferenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuntosReferenciaService]
    });
  });

  it('should be created', inject([PuntosReferenciaService], (service: PuntosReferenciaService) => {
    expect(service).toBeTruthy();
  }));
});
