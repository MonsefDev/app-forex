import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionFormComponent } from './conversion-form.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConversionFormComponent', () => {
  let component: ConversionFormComponent;
  let fixture: ComponentFixture<ConversionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionFormComponent,
        BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
