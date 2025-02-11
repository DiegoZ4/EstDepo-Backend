"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1730140862977 = void 0;
class init1730140862977 {
    constructor() {
        this.name = 'init1730140862977';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "partido" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL, "ubicacion" character varying(255) NOT NULL, "golesLocal" integer NOT NULL DEFAULT '0', "golesVisitante" integer NOT NULL DEFAULT '0', "estado" character varying NOT NULL DEFAULT 'programado', "description" character varying(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "equipo_local_id" integer, "equipo_visitante_id" integer, "torneo_id" integer, CONSTRAINT "PK_5530970b0cfb1b6f50b71a20122" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "torneo" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying NOT NULL, "description" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "paisId" integer, CONSTRAINT "PK_594cbe0a907eb32cb0ddfd63fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pais" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying NOT NULL, "description" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_a362c5bbbefe39c9187406b1917" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jugador" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying NOT NULL, "edad" integer NOT NULL, "posicion" character varying(255) NOT NULL DEFAULT 'Portero', "goles" integer NOT NULL DEFAULT '0', "asistencias" integer NOT NULL DEFAULT '0', "fechaNacimiento" date, "altura" double precision, "peso" double precision, "tarjetasAmarillas" integer NOT NULL DEFAULT '0', "tarjetasRojas" integer NOT NULL DEFAULT '0', "description" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "paisId" integer, "equipoId" integer, CONSTRAINT "PK_1ab9b28fb3c4e9135da05f1cc3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipo" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createdOn" integer NOT NULL, "image" character varying NOT NULL, "description" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "paisId" integer, "torneoId" integer, CONSTRAINT "PK_a545d29b4870688c462189447da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "partido" ADD CONSTRAINT "FK_5b83e3f11cf3d04fd12ea725ab9" FOREIGN KEY ("equipo_local_id") REFERENCES "equipo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partido" ADD CONSTRAINT "FK_432c71e550fc750cdcebfbfae37" FOREIGN KEY ("equipo_visitante_id") REFERENCES "equipo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partido" ADD CONSTRAINT "FK_ae33497068d5600c457e9b87833" FOREIGN KEY ("torneo_id") REFERENCES "torneo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "torneo" ADD CONSTRAINT "FK_4723be37090c934f64d5b44e5c7" FOREIGN KEY ("paisId") REFERENCES "pais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jugador" ADD CONSTRAINT "FK_748962eda1eb65af7ddd4998a0f" FOREIGN KEY ("paisId") REFERENCES "pais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jugador" ADD CONSTRAINT "FK_802aadcd3ccf13918d9374b34e1" FOREIGN KEY ("equipoId") REFERENCES "equipo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD CONSTRAINT "FK_cee4b9b1e420f3b1dc5b8069a9e" FOREIGN KEY ("paisId") REFERENCES "pais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD CONSTRAINT "FK_bc1af67e68f4f3e50e5aa52b95f" FOREIGN KEY ("torneoId") REFERENCES "torneo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "equipo" DROP CONSTRAINT "FK_bc1af67e68f4f3e50e5aa52b95f"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP CONSTRAINT "FK_cee4b9b1e420f3b1dc5b8069a9e"`);
        await queryRunner.query(`ALTER TABLE "jugador" DROP CONSTRAINT "FK_802aadcd3ccf13918d9374b34e1"`);
        await queryRunner.query(`ALTER TABLE "jugador" DROP CONSTRAINT "FK_748962eda1eb65af7ddd4998a0f"`);
        await queryRunner.query(`ALTER TABLE "torneo" DROP CONSTRAINT "FK_4723be37090c934f64d5b44e5c7"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP CONSTRAINT "FK_ae33497068d5600c457e9b87833"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP CONSTRAINT "FK_432c71e550fc750cdcebfbfae37"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP CONSTRAINT "FK_5b83e3f11cf3d04fd12ea725ab9"`);
        await queryRunner.query(`DROP TABLE "equipo"`);
        await queryRunner.query(`DROP TABLE "jugador"`);
        await queryRunner.query(`DROP TABLE "pais"`);
        await queryRunner.query(`DROP TABLE "torneo"`);
        await queryRunner.query(`DROP TABLE "partido"`);
    }
}
exports.init1730140862977 = init1730140862977;
//# sourceMappingURL=1730140862977-init.js.map