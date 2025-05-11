import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface PokemonApiResponse {
    results: { name: string; url: string }[];
    next: string | null;
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private http: HttpClient) {}

    getPokemonList(limit = 20, offset = 0): Observable<PokemonApiResponse> {
        return this.http.get<PokemonApiResponse>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
    }
}
