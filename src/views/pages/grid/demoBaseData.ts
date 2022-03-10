import { UnitType, GridData } from '@/views/components/Grid';

const gridData: GridData = {
    rows: [
        { height: 100, unit: UnitType.PX },
        { height: 1, unit: UnitType.FR },
    ],
    columns: [
        { width: 20, unit: UnitType.VW },
        { width: 80, unit: UnitType.VW },
    ],
    areas: {
        style: [
            ['header', 'header'],
            ['menu', 'content'],
        ],
        blocks: [
            'header',
            'menu',
            {
                areaName: 'content',
                gridLayout: {
                    rows: [
                        { height: 100, unit: UnitType.PX },
                        { height: 1, unit: UnitType.FR },
                    ],
                    columns: [
                        { width: 1, unit: UnitType.FR },
                        { width: 3, unit: UnitType.FR },
                    ],
                }
            }
        ]
    }
}

export default gridData