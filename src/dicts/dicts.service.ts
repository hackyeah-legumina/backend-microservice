import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DictsService {
    constructor(private readonly db: PrismaService) {}

    async getCities() {
        const cities = await this.db.universities.findMany({
            where: { AND: [{ city: { not: null } }, { city: { not: '' } }] },
            select: { city: true },
            distinct: ['city'],
            orderBy: [{ city: 'asc' }],
        });
        return cities.map(({ city }) => city);
    }

    async getTypes() {
        const institutionTypes = await this.db.universities.findMany({
            where: {
                AND: [
                    { institutionType: { not: null } },
                    { institutionType: { not: '' } },
                ],
            },
            select: { institutionType: true },
            distinct: ['institutionType'],
            orderBy: [{ institutionType: 'asc' }],
        });

        const universityTypes = await this.db.universities.findMany({
            where: {
                AND: [
                    { universityType: { not: null } },
                    { universityType: { not: '' } },
                ],
            },
            select: { universityType: true },
            distinct: ['universityType'],
            orderBy: [{ universityType: 'asc' }],
        });

        const result = [
            ...institutionTypes.map(({ institutionType }) => institutionType),
            ...universityTypes.map(({ universityType }) => universityType),
        ];

        return result.sort();
    }
}
