import { TGridSize } from '@/types/game';

import { calculateGridSize } from '@/lib/grid';

export const DEFAULT_BOARD_SIZE: TGridSize = calculateGridSize();

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const SHUFFLE_REFRESH_INTERVAL = ONE_MINUTE; // refresh after 5 minutes
export const BOOSTER_RESET_INTERVAL = 5 * ONE_SECOND; // reset after 5 seconds

export const SHUFFLE_MAX = 10;
export const BOOSTER_MAX = 100;
export const SCORE_DEFAULT = 2;
export const SCORE_TEN = 10;
