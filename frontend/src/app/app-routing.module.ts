import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./directory/directory.module').then(m => m.DirectoryModule) },
  { path: 'room', loadChildren: () => import('./room/room.module').then(m => m.RoomModule) },
  { path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
