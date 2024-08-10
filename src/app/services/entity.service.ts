import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntityService<T> extends DataService<T> {
  private entitiesSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public entities$: Observable<T[]> = this.entitiesSubject.asObservable();

  constructor(http: HttpClient, @Inject(String) endpoint: string) {
    super(http, endpoint);
  }

  // Fetch all entities and update the shared state
  fetchEntities(): void {
    this.getAll().pipe(
      tap(entities => this.entitiesSubject.next(entities))
    ).subscribe();
  }

  // Add a new entity and update the shared state
  addEntity(newEntity: T): void {
    this.create(newEntity).pipe(
      tap(entity => {
        const currentEntities = this.entitiesSubject.value;
        this.entitiesSubject.next([...currentEntities, entity]);
      })
    ).subscribe();
  }

  // Delete an entity and update the shared state
  deleteEntity(entityId: any): void {
    this.delete(entityId).pipe(
      tap(() => {
        const currentEntities = this.entitiesSubject.value.filter(entity => (entity as any).id !== entityId);
        this.entitiesSubject.next(currentEntities);
      })
    ).subscribe();
  }

  // Update an entity and update the shared state
  updateEntity(entityId: any, updatedData: Partial<T>): void {
    this.update(entityId, updatedData).pipe(
      tap(updatedEntity => {
        const currentEntities = this.entitiesSubject.value.map(entity =>
          (entity as any).id === entityId ? updatedEntity : entity
        );
        this.entitiesSubject.next(currentEntities);
      })
    ).subscribe();
  }
}
