import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'demande_permis'})
export class Permi {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    piece_joint: string

    @Column({nullable: false})
    latitude: string

    @Column({nullable: false})
    longitude: string

    @Column({default: 'en attente'})
    statut: string

    @Column({nullable: false})
    id_utilisateur: number

    @Column({nullable: false})
    permi: string
}
