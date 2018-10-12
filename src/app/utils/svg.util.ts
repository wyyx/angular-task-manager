import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
	ir.addSvgIcon('whatapp-logo', ds.bypassSecurityTrustResourceUrl('assets/whatsapp-logo.svg'))
}
