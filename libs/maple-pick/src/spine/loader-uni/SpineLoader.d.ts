import { ISpineResource, SpineLoaderAbstract } from '@pixi-spine/loader-base';
import { ISkeletonData, ISkeletonParser, TextureAtlas } from '@pixi-spine/base';
/**
 * @public
 */
export declare class SpineLoader extends SpineLoaderAbstract<ISkeletonData> {
    createBinaryParser(): ISkeletonParser;
    createJsonParser(): ISkeletonParser;
    parseData(parser: ISkeletonParser, atlas: TextureAtlas, dataToParse: any): ISpineResource<ISkeletonData>;
}
//# sourceMappingURL=SpineLoader.d.ts.map