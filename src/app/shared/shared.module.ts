import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'
import { RouterModule } from '@angular/router'
import { DirectiveModule } from '../directive/directive.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AgeInputComponent } from './age-input/age-input.component'
import { ImageSelectorComponent } from './image-selector/image-selector.component'
import { ChipSelectorComponent } from './chip-selector/chip-selector.component'
import { CertificateSelectorComponent } from './certificate-selector/certificate-selector.component'
import { AddressSelectorComponent } from './address-selector/address-selector.component'
import { ContextMenuComponent } from './context-menu/context-menu.component'
import { ContextMenuItemComponent } from './context-menu-item/context-menu-item.component'
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive'
import { ContextMenuBackdropDirective } from './context-menu-backdrop.directive'

@NgModule({
  imports: [
    CommonModule,
    MyCustomMaterialModule,
    RouterModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageSelectorComponent,
    AgeInputComponent,
    ChipSelectorComponent,
    CertificateSelectorComponent,
    AddressSelectorComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuTriggerDirective,
    ContextMenuBackdropDirective
  ],
  exports: [
    CommonModule,
    MyCustomMaterialModule,
    RouterModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageSelectorComponent,
    AgeInputComponent,
    ChipSelectorComponent,
    CertificateSelectorComponent,
    AddressSelectorComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuTriggerDirective,
    ContextMenuBackdropDirective
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
