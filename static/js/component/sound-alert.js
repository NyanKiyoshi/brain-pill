import smsAlert from '../../sounds/sms-alert.wav';
const NOTIFICATION_SOUND = new Audio(smsAlert);

$(function() {
  $('.list-group-item').on('click', function () {
    if (!NOTIFICATION_SOUND.paused) {
      NOTIFICATION_SOUND.pause();
      NOTIFICATION_SOUND.currentTime = 0;
    }
    return NOTIFICATION_SOUND.play();
  });
});
