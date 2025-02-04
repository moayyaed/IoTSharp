import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignerComponent } from './designer/designer.component';
import { FloweventsComponent } from './flowevents/flowevents.component';
import { FlowlistComponent } from './flowlist/flowlist.component';
import { RuledeviceComponent } from './ruledevice/ruledevice.component';

const routes: Routes = [
  { path: 'flowlist', component: FlowlistComponent },
  { path: 'flowevents', component: FloweventsComponent },
  { path: 'designer', component: DesignerComponent },
  { path: 'ruledevice', component: RuledeviceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule {}
