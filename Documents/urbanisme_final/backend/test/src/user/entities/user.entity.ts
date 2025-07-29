import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
        id: number
    
        @Column({nullable: false})
        nom: string

        @Column({nullable: false})
        prenom: string

        @Column({nullable: false})
        adresse: string

        @Column({nullable: false})
        cin: string
    
        @Column({unique:true, nullable:false})
        email: string
    
        @Column({unique: true, nullable: false})
        telephone: string
    
        @Column({nullable: false})
        mot_de_passe: string
    
        @Column({nullable: false, default: 'client'})
        role: string

        @Column({ type: 'varchar', nullable: true })
        code : string | null

        @Column({ type: 'timestamp', nullable: true })
        codeCreatedAt: Date | null;

}
