/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { BusViewComponent } from './bus-view.component';

describe('Component: BusView', () => {
  it('should create an instance', () => {
    let component = new BusViewComponent();
    expect(component).toBeTruthy();
  });
});
