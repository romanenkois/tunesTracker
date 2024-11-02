import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataRepository } from '@repository/user-data.repository';
import { ApiService } from '@service/api.service';
import { ArtistDTO } from '@dto/artist.dto';
import { UserTopArtistsComponent } from "../../widgets/user-top-artists/user-top-artists.component";

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule, UserTopArtistsComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export default class UserDataComponent  {


}
