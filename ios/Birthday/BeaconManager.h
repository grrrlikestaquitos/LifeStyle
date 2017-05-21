//
//  BeaconManager.h
//  LifeStyle
//
//  Created by Andrei Villasana on 5/16/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>

@interface BeaconManager : NSObject <RCTBridgeModule>

+ (id) sharedSettings;

@end
