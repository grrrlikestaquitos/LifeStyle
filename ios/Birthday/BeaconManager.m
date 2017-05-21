//
//  BeaconManager.m
//  LifeStyle
//
//  Created by Andrei Villasana on 5/16/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "BeaconManager.h"
#import "SBKBeaconID.h"
#import "SBKBeaconManager.h"

@interface BeaconManager () <SBKBeaconManagerDelegate>
  @property (nonatomic, strong) SBKBeaconID *beaconID;
  @property (nonatomic, strong) NSMutableArray *beaconList;
@end


@implementation BeaconManager

RCT_EXPORT_MODULE();

- (instancetype) init {
  
  if (self = [super init]) {
    NSLog(@"Beacon manager was initizalied");
    
    _beaconID = [SBKBeaconID beaconIDWithProximityUUID:SBKSensoroDefaultProximityUUID];
    _beaconList = [[NSMutableArray alloc] init];
    
    [[SBKBeaconManager sharedInstance] startRangingBeaconsWithID:_beaconID
                                               wakeUpApplication:YES];
    
    /*Request authorization*/
    [[SBKBeaconManager sharedInstance] requestAlwaysAuthorization];
    [[SBKBeaconManager sharedInstance] addBroadcastKey:@"01Y2GLh1yw3+6Aq0RsnOQ8xNvXTnDUTTLE937Yedd/DnlcV0ixCWo7JQ+VEWRSya80yea6u5aWgnW1ACjKNzFnig=="];
    [SBKBeaconManager sharedInstance].delegate = self;
  }
  return (self);
}

//Singleton
+ (id) sharedSettings {
  static id sharedMyModel = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedMyModel = [[self alloc] init];
  });
  
  return sharedMyModel;
}

RCT_EXPORT_METHOD(getBeaconList:(RCTResponseSenderBlock)callback) {
  callback(@[[NSNull null], self.beaconList]);
}

// SBK Delegate Methods

- (void) beaconManager:(SBKBeaconManager *)beaconManager didRangeNewBeacon:(SBKBeacon *)beacon {
  
  NSString *serialNumber = beacon.serialNumber;
  NSLog(@"Ranged a beacon %@", serialNumber);
  
  [self.beaconList addObject:serialNumber];
  
}

- (void) beaconManager:(SBKBeaconManager *)beaconManager beaconDidGone:(SBKBeacon *)beacon {
  
  NSString *serialNumber = beacon.serialNumber;
  NSLog(@"Beacon went out of range %@", serialNumber);
  
  [self.beaconList removeObject:serialNumber];
  
}



@end
