export interface TimelineModel {
    TITLE?: string;
    DESCRIPTION?: string;
    DATE?: string;
    DURATION?: string;
    ACTUAL?: boolean;
    URL?: string;
    JOBPOSITIONS?: TimelineJobPositionModel[];
}

export interface TimelineJobPositionModel {
    POSITION?: string;
    DESCRIPTION?: string;
    DURATION?: string;
}
