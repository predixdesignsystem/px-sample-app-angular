/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { WsListContainerComponent } from './ws-list-container.component';

describe('Component: WsListContainer', () => {
  it('should create an instance', () => {
    let component = new WsListContainerComponent();
    expect(component).toBeTruthy();
  });
});
