import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenMessagesComponent } from './hidden-messages.component';

describe('HiddenMessagesComponent', () => {
  let component: HiddenMessagesComponent;
  let fixture: ComponentFixture<HiddenMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiddenMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HiddenMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
