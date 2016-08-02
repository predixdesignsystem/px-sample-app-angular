/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { PxTestComponent } from './pxtest.component';

describe('Component: PxTest', () => {
  it('should create an instance', () => {
    let component = new PxTestComponent();
    expect(component).toBeTruthy();
  });
});
