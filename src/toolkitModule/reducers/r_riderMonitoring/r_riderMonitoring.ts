import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { getRiderList, getMapRiderListMulti } from '../../action/rider/rider';
import { riderList, riderListSendData, commonReceiveData } from '../../interface/rider/interface';

const initialState = {
  loading: false,
  data: [] as riderList[],
  error: null as any,
};

export const sampleSlice = createSlice({
  name: 'riderCommon',
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(
        getRiderList.pending,
        (
          state: commonReceiveData,
          action: PayloadAction<
            undefined,
            string,
            {
              arg: riderListSendData;
              requestId: string;
              requestStatus: 'pending';
            },
            never
          >
        ) => {
          state.loading = true;
          state.data = [];
          state.error = null;
        }
      )
      .addCase(
        getRiderList.fulfilled,
        (
          state: commonReceiveData,
          action: PayloadAction<
            riderList[],
            string,
            {
              arg: riderListSendData;
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(
        getRiderList.rejected,
        (
          state: commonReceiveData,
          action: PayloadAction<
            unknown,
            string,
            {
              arg: riderListSendData;
              requestId: string;
              requestStatus: 'rejected';
              aborted: boolean;
              condition: boolean;
            } & (
              | {
                  rejectedWithValue: true;
                }
              | ({
                  rejectedWithValue: false;
                } & {})
            ),
            SerializedError
          >
        ) => {
          state.loading = false;
          state.data = [];
          state.error = action.payload;
        }
      ),
  // .addCase(
  //   getMapRiderListMulti.pending,
  //   (
  //     state: commonReceiveData,
  //     action: PayloadAction<
  //       undefined,
  //       string,
  //       {
  //         arg: riderListSendData;
  //         requestId: string;
  //         requestStatus: 'pending';
  //       },
  //       never
  //     >
  //   ) => {
  //     state.loading = true;
  //     state.data = [];
  //     state.error = null;
  //   }
  // )
  // .addCase(
  //   getMapRiderListMulti.fulfilled,
  //   (
  //     state: commonReceiveData,
  //     action: PayloadAction<
  //       riderList[],
  //       string,
  //       {
  //         arg: riderListSendData;
  //         requestId: string;
  //         requestStatus: 'fulfilled';
  //       },
  //       never
  //     >
  //   ) => {
  //     state.loading = false;
  //     state.data = action.payload;
  //     state.error = null;
  //   }
  // )
  // .addCase(
  //   getMapRiderListMulti.rejected,
  //   (
  //     state: commonReceiveData,
  //     action: PayloadAction<
  //       unknown,
  //       string,
  //       {
  //         arg: riderListSendData;
  //         requestId: string;
  //         requestStatus: 'rejected';
  //         aborted: boolean;
  //         condition: boolean;
  //       } & (
  //         | {
  //             rejectedWithValue: true;
  //           }
  //         | ({
  //             rejectedWithValue: false;
  //           } & {})
  //       ),
  //       SerializedError
  //     >
  //   ) => {
  //     state.loading = false;
  //     state.data = [];
  //     state.error = action.payload;
  //   }
  // )
  // .addMatcher(
  //   (action) => {
  //     return action.type.includes('RiderMonitoring/common/');
  //   },
  //   (state, action) => {
  //     console.log('action type : ', action.type);
  //     if (action.type.includes('RiderMonitoring/common/pending')) {
  //       state.loading = true;
  //     } else if (action.type.includes('RiderMonitoring/common/fulfilled')) {
  //       state.data = action.payload;
  //       state.loading = false;
  //     } else if (action.type.includes('RiderMonitoring/common/rejected')) {
  //       state.data = action.payload;
  //       state.loading = false;
  //     }
  //   }
  // ),
});

// export const { getRiderListActons, getMapRiderListMultiActons } =
//   riderSlice.actions;
