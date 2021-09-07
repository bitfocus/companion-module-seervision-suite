## Seervision Production

This module will allow you to control Seervision Suite during your production. For the full information about the setup and usage, please refer to the [Seervision User Manual](https://manual.seervision.com/#/companion_module).

### Available actions

- **Recall a container** - this action will recall a specific container.
- **Create a container** - this action will create a container with a specified configuration.
- **Start tracking** -- this action will initiate tracking, or switch tracked VIP as specified by the option.
- **Start tracking at point** -- this action will initiate tracking, or switch tracked VIP as specified by the target point.
- **Stop tracking** -- this action will stop tracking the VIP.
- **Toggle tracking** -- this action will toggle tracking state.
- **Take PTU control** -- this action will take control of the PTU from the head, if the head has its own control system.
- **Release PTU control** -- this action will release control of the PTU from the head, if the head has its own control system.
- **Toggle PTU control** -- this action will toggle control of the PTU from the head, if the head has its own control system.
- **Set Tally status** -- this action will set the tally status to either none/preview/program.
- **Toggle Trigger Zone state** -- this action will enable or disable a Trigger Zone.

### Configuration

In order to set up module, you will need to specify IP on which the Seervision Suite can be reached. If you're not sure, you can find the IP in the [Operations Server](https://manual.seervision.com/#/getting_started?id=dop-ip-address).

### Troubleshooting

If an action does not work, it is possible that connection to the Seervision Suite got lost. If that's the case, you can use the **Reset Connection** action to reestablish the connection.
