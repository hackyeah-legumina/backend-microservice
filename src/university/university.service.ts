import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { arrayify } from '../common/functions/arrayify';
import { UniversityOrder } from './enums/university-order.enum';
import { Prisma } from '@prisma/client';
import { UniversityFilter } from './enums/university-filter.enum';

@Injectable()
export class UniversityService {
    constructor(private readonly db: PrismaService) {}

    findById(id: string) {
        return this.db.universities.findUnique({ where: { id } });
    }

    paginate(
        skip: number,
        take: number,
        order: string | string[],
        filter: string | string[],
    ) {
        const orderBy: Prisma.UniversitiesOrderByWithRelationInput[] = arrayify(
            order,
        ).map((o) => {
            const [field, sort = 'asc'] = o.split(':');
            if (
                !Object.keys(UniversityOrder).includes(field) ||
                !['asc', 'desc'].includes(sort)
            ) {
                throw new BadRequestException(
                    `Order ${field}:${sort} is invalid`,
                );
            }
            return { [field]: UniversityOrder[sort] };
        });

        const where = arrayify(filter).reduce(
            (acc, f) => {
                const [field, value] = f.split(':');

                if (field === UniversityFilter.city) acc.city.push(value);
                else if (field === UniversityFilter.type) acc.type.push(value);

                return acc;
            },
            { city: <string[]>[], type: <string[]>[] },
        );

        console.log({
            where: {
                city: !!where.city.length ? { in: where.city } : undefined,
                OR: [
                    {
                        institutionType: !!where.type.length
                            ? { in: where.type }
                            : undefined,
                        universityType: !!where.type.length
                            ? { in: where.type }
                            : undefined,
                    },
                ],
            },
        });

        return this.db.universities.findMany({
            where: {
                city: !!where.city.length ? { in: where.city } : undefined,
                OR: !!where.type.length
                    ? [
                          { institutionType: { in: where.type } },
                          { universityType: { in: where.type } },
                      ]
                    : undefined,
            },
            orderBy,
            take,
            skip,
        });
    }
}
