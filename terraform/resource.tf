resource "aws_instance" "tt_instance" {
  ami = "ami-0705384c0b33c194c"
  instance_type = "t3.small"
  key_name = data.aws_key_pair.key_pair.key_name

  vpc_security_group_ids = [aws_security_group.tt_sg.id]

  tags = {
    Name = "tt_server"
  }

  root_block_device {
    volume_size = 16
  }

  cpu_options {
    core_count = 1
    threads_per_core = 2
  }
}