import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "notification"})
export class Notification {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({nullable: false})
    contenu: string

    @CreateDateColumn({ name: 'date_envoye' })
    date_envoye: Date;


    @Column({nullable: false})
    email_destinataire: string

    @Column({nullable: false})
    email_envoyeur: string
    
    @Column({nullable: false})
    id_permis: number
    
    @Column({default: false})
    lu: boolean

}
