import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
	const img = 'assets/img'
	ir.addSvgIcon('whatapp-logo', ds.bypassSecurityTrustResourceUrl(`${img}/whatsapp-logo.svg`))
	ir.addSvgIcon('unassigned', ds.bypassSecurityTrustResourceUrl(`${img}/avatar/unassigned.svg`))
	ir.addSvgIconSetInNamespace(
		'avatars',
		ds.bypassSecurityTrustResourceUrl(`${img}/avatar/avatars.svg`)
	)
}
