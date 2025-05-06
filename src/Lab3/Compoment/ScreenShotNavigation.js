import React from 'react';
import RootNavigation from './RootNavigation';
import { UserProvider } from '../Firebase/UserContext';

const ScreenShotNavigation = () => {
    return (
        <UserProvider>
            <RootNavigation />
        </UserProvider>
    );
};

export default ScreenShotNavigation;